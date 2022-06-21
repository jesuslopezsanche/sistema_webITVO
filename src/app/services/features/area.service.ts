import { ActivatedRoute } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { Firestore, CollectionReference, DocumentData, QueryDocumentSnapshot, collection, getDocs, collectionData, query, setDoc, doc, addDoc, docData, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
export interface Area {
  id?: string;
  name: string;
  status: any;
  capacity?: number
  supervisor?: number
  computers?: Boolean
  career?: number
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  deleteById(id: string) {
    return from(deleteDoc(doc(this.colRef, id)))
  }

  colRef: CollectionReference
  areas: Area[] | null
  selectedArea: string = ''

  constructor(private firestore: Firestore, private route: ActivatedRoute) {
    this.colRef = collection(firestore, 'areas')
    this.areas = null
  }

  create(area: Area) {
    return from(addDoc(this.colRef, area).then(e => e))
  }
  update(id: string, area: Area) {
    return from(updateDoc(doc(this.colRef, id), {
      ...area
    }))
  }

  getAll() {
    let areas = getDocs(query(this.colRef))
      .then(e => e.docs)
      .then(e => {
        this.areas = e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Area
      })
      return this.areas
    })

    return from(areas)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Area
    }
    )
  }
  setSelectedArea(areaId: string) {
    this.selectedArea = areaId
  }

}
