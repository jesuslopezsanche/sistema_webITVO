import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, query, QueryDocumentSnapshot, updateDoc } from '@angular/fire/firestore';
import { from, of, Observable } from 'rxjs';

export interface Material{
  id?:string,
  serialNumber: string,
  name: string,
  quantity: number,
  brand: string,
  status: 'Excelente' | 'Bueno' | 'Regular'| 'Malo'
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  colRef: CollectionReference
  materials: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore) {
    this.colRef = collection(firestore, 'materials')
    this.materials = of(null)
  }

  create(group: Material ) {
    return from(addDoc(this.colRef, group).then(e => e))
  }
  update(id:string ,material: Material) {
    return from(updateDoc(doc(this.colRef, id),{
      name: material.name,
      status: material.status,
    },))
  }

  getAll() {
    let materials = getDocs(query(this.colRef))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() }
      }))

    return from(materials)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Material
    }
    )
  }
  
  deleteById(id: string ) {
    return from(deleteDoc(doc(this.colRef, id)))
  }
}
