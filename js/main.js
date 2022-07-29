var photoUrl = document.querySelector('#photo-url');
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

  journalEntry.reset();
  image.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');

  var $entry = renderJournal(completedForm);
  if (data.editing !== null) {
    completedForm.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = completedForm;
        ul.children[i].replaceWith($entry);
        data.editing = null;
        break;
      }
    }
  } else {
    data.nextEntryId++;
    data.entries.unshift(completedForm);
    ul.prepend($entry);
  }
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

  var columnRight = document.createElement('div');
  columnRight.setAttribute('class', 'column-half');

  var title = document.createElement('h3');
  title.textContent = entry.title;

  var notesText = document.createElement('p');
  notesText.textContent = entry.notes;

  var editPen = document.createElement('i');
  editPen.className = 'fa-regular fa-pen-to-square icon';

  // Ensure that each rendered entry is given a data-entry-id attribute indicating which entry it is.
  list.setAttribute('data-entry-id', entry.entryId);

  ul.appendChild(list);
  list.appendChild(row);
  row.appendChild(columnHalf);
  columnHalf.appendChild(image);
  row.appendChild(columnRight);
  columnRight.appendChild(title);
  columnRight.appendChild(notesText);
  title.appendChild(editPen);

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

var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

function editButton(event) {
  if (event.target.matches('.icon')) {
    viewSwap('new-entry');
  }
  if (event.target && event.target.tagName === 'I') {
    var $closest = event.target.closest('.li');
    var entryId = $closest.getAttribute('data-entry-id');

    for (var g = 0; g < data.entries.length; g++) {
      if (Number(entryId) === data.entries[g].entryId) {
        data.editing = data.entries[g];
      }
      $title.value = data.editing.title;
      photoUrl.value = data.editing.photoUrl;
      $notes.value = data.editing.notes;
      image.setAttribute('src', data.editing.photoUrl);
    }
  }
}

ul.addEventListener('click', editButton);

var $modal = document.querySelector('.modal');
var $delete = document.querySelector('.delete');
var $cancel = document.querySelector('#cancel');
var $confirm = document.querySelector('#confirm');

function openModal(event) {
  $modal.className = 'modal';
}
function closeModal(event) {
  $modal.className = 'modal hidden';
}

function aDelete(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      ul.children[i].remove();
      viewSwap('entries');
      closeModal();
    }
  }
}

$delete.addEventListener('click', openModal);
$cancel.addEventListener('click', closeModal);
$confirm.addEventListener('click', aDelete);

