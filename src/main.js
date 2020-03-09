mainLoop();

function mainLoop() {
  if (document.querySelector("div#title_subtitle") != null) {
    if (document.querySelector("#facebook2calendar") == null) {
      try {
        addButton();
      } catch (e) {
        console.log(e);
      }
    }
  }
  setTimeout(mainLoop, 500);
}

function addButton() {
  const containerSelector = "#event_button_bar div.rfloat";
  const containingDiv = document.querySelector(containerSelector);
  buttonClass = containingDiv.querySelector("a[role=button]").className;

  const eventUrl = getEventUrl();

  const button = getButton(buttonClass, eventUrl);
  containingDiv.insertBefore(button, containingDiv.firstChild);
}

function getButton(buttonClass, eventUrl) {
  const button = document.createElement("A");
  button.innerText = "+ Calendar";
  button.setAttribute("target", "_blank");
  button.setAttribute("href", eventUrl);
  button.setAttribute("class", buttonClass);
  button.setAttribute("id", "facebook2calendar");
  return button;
}

function getEventUrl() {
  const eventInfo = {
    text: getEventTitle(),
    location: getEventLocation(),
    details: getEventDetails(),
    dates: getEventDates()
  };
  const eventUrl = `http://www.google.com/calendar/event?action=TEMPLATE&dates=${eventInfo.dates}&text=${eventInfo.text}&location=${eventInfo.location}&details=${eventInfo.details}`;
  return eventUrl;
}

function getEventTitle() {
  const titleSelector = "div#title_subtitle h1";
  return document.querySelector(titleSelector).innerText;
}

function getEventLocation() {
  const locationSelector = "#event_time_info + li div";
  const locationDirty = document
    .querySelector(locationSelector)
    .innerText.split("\n");
  const eventLocation = locationDirty[locationDirty.length - 2];
  return eventLocation;
}

function getEventDetails() {
  const eventLink = window.location.href;
  return `${eventLink}`;
}

function getEventDates() {
  const datesSelector = "#event_time_info div[content]";
  const rawDates = document
    .querySelector(datesSelector)
    .getAttribute("content")
    .split(" to ");

  const startDate = new Date(rawDates[0]);
  const endDate =
    rawDates.length == 2 ? new Date(rawDates[1]) : generateEndDate(rawDates[0]);

  return `${parseDate(startDate)}/${parseDate(endDate)}`;
}

function generateEndDate(rawStartDate) {
  const endDate = new Date(rawStartDate);
  endDate.setHours(endDate.getHours() + 1);
  return endDate;
}

function parseDate(dateObj) {
  return dateObj
    .toISOString()
    .replace(/:/g, "")
    .replace(/-/g, "")
    .replace(/[/.].../g, "");
}
