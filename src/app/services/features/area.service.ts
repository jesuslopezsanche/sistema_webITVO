import { from, Observable, of } from 'rxjs';
import { Firestore, CollectionReference, DocumentData, QueryDocumentSnapshot, collection, getDocs, collectionData, query, setDoc, doc, addDoc, docData, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
export interface Area { id?:string, name: any; status: any; }

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  deleteById(id: string ) {
    return from(deleteDoc(doc(this.colRef, id)))
  }

  colRef: CollectionReference
  areas: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore) {
    this.colRef = collection(firestore, 'areas')
    this.areas = of(null)
  }

  create(area: Area) {
    return from(addDoc(this.colRef, area).then(e => e))
  }
  update(id:string ,area: Area) {
    return from(updateDoc(doc(this.colRef, id),{
      name: area.name,
      status: area.status,
    },))
  }

  getAll() {
    let areas = getDocs(query(this.colRef))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Area
      }))

    return from(areas)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Area
    }
    )
  }

}
