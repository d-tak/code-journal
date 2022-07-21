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
}

journalEntry.addEventListener('submit', handleSubmit);
