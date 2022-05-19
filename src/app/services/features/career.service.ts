import { from, Observable, of } from 'rxjs';
import { CollectionReference, DocumentData, QueryDocumentSnapshot, Firestore, collection, addDoc, updateDoc, doc, query, getDoc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

export interface Career {
  name:string
  id?:string
}
@Injectable({
  providedIn: 'root'
})
export class CareerService {

  colRef: CollectionReference
  carrers: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore) {
    this.colRef = collection(firestore, 'careers')
    this.carrers = of(null)
  }

  create(group: Career ) {
    return from(addDoc(this.colRef, group).then(e => e))
  }
  update(id:string ,career: Career) {
    return from(updateDoc(doc(this.colRef, id),{
      name: career.name,
    },))
  }

  getAll() {
    let groups = getDocs(query(this.colRef))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Career
      }))

    return from(groups)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Career
    }
    )
  }
  
  deleteById(id: string ) {
    return from(deleteDoc(doc(this.colRef, id)))
  }
}
