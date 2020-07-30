import { Category } from './category';
import { Reminder } from './reminder';

export class Note {
  noteId: Number;
  noteContent: string;
  noteCreationDate: Date;
  noteStatus: string;
  noteCreatedBy: string;
  category: Category[];
  reminders: Reminder[];
  noteTitle: string;
  color: String;

  constructor() {

  }
}
