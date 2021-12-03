import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
})
export class FireBaseService {
    constructor(
        private firestore: AngularFirestore
    ) {
    }
    getNotification() {
        return this.firestore.collection('notifications').snapshotChanges();
    }
}
export interface INotification {
    id?: string;
    date?: string;
    message?: string;
    isReadIt?: string;
    schemaName?: string;
    roles?: string;
    username?: string; // how do the action
    notificationUrl?: string; // path to notification url
    userId?: string;
    icon?: string;
    config?: boolean;
}
