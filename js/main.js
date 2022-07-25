var photoUrl = document.querySelector('.photo-url');
var image = document.querySelector('img');

function handleEvent(event) {
  image.setAttribute('src', event.target.value);
}

photoUrl.addEventListener('input', handleEvent);

var journalEntry = document.querySelector('#form-input');

function handleSubmit(event) {
  event.preventDefault();

  var completedForm = {
    title: journalEntry.elements.title.value,
    photoUrl: journalEntry.elements.photoUrl.value,
    notes: journalEntry.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  journalEntry.reset();
  image.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.entries.unshift(completedForm);
  var newEntry = renderJournal(completedForm);
  ul.prepend(newEntry);
  viewSwap('entries');

}

journalEntry.addEventListener('submit', handleSubmit);

function renderJournal(entry) {
  var list = document.createElement('li');
  list.setAttribute('class', 'li');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  var image = document.createElement('img');
  image.setAttribute('src', entry.photoUrl);

  var columnHalf2 = document.createElement('div');
  columnHalf2.setAttribute('class', 'column-half');

  var title = document.createElement('h3');
  title.textContent = entry.title;

  var notesText = document.createElement('p');
  notesText.textContent = entry.notes;

  ul.appendChild(list);
  list.appendChild(row);
  row.appendChild(columnHalf);
  columnHalf.appendChild(image);
  row.appendChild(columnHalf2);
  columnHalf2.appendChild(title);
  columnHalf2.appendChild(notesText);

  return list;

}

var ul = document.querySelector('ul');

function handleEventDom(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderJournal(data.entries[i]);
    ul.append(newEntry);
  }
}

window.addEventListener('DOMContentLoaded', handleEventDom);

var button = document.querySelectorAll('[data-link]');
var tabs = document.querySelectorAll('[data-view]');

function currentWindow(event) {
  var viewEntry = event.target.getAttribute('data-link');
  viewSwap(viewEntry);
}

function viewSwap(viewEntry) {
  for (var k = 0; k < tabs.length; k++) {
    if (tabs[k].getAttribute('data-view') === viewEntry) {
      tabs[k].className = 'viewentry';
    } else {
      (tabs[k].className = 'viewentry hidden');

    }
  }
}

for (var i = 0; i < button.length; i++) {
  button[i].addEventListener('click', currentWindow);
}
