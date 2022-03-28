import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, query, QueryDocumentSnapshot, updateDoc } from '@angular/fire/firestore';
import { from, of, Observable } from 'rxjs';


export interface Group{
  id?:string
  name:string
  status:boolean
}
@Injectable({
  providedIn: 'root'
})
export class GroupService {
 
  colRef: CollectionReference
  groups: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore) {
    this.colRef = collection(firestore, 'groups')
    this.groups = of(null)
  }

  create(group: Group ) {
    return from(addDoc(this.colRef, group).then(e => e))
  }
  update(id:string ,area: Group) {
    return from(updateDoc(doc(this.colRef, id),{
      name: area.name,
      status: area.status,
    },))
  }

  getAll() {
    let groups = getDocs(query(this.colRef))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() }
      }))

    return from(groups)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Group
    }
    )
  }
  
  deleteById(id: string ) {
    return from(deleteDoc(doc(this.colRef, id)))
  }
}
