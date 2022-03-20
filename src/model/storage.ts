import { firebaseConfig, collectionName } from "../utils/api";
import FirebaseTasksCalendar from "./FirebaseTasksCalendar";

const storage = new FirebaseTasksCalendar(firebaseConfig, collectionName);

export default storage;
