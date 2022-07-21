/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('codejournal-local-storage');
if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', saveJournal);

function saveJournal(event) {
  var stringifyJournalJSON = JSON.stringify(data);
  localStorage.setItem('codejournal-local-storage', stringifyJournalJSON);
}
