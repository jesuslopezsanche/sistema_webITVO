import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, from, Observable, of, Subject, switchMap } from 'rxjs';
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
  areas: BehaviorSubject<Area[] | null>
  currentArea?: Area
  selectedArea: string = ''

  constructor(private firestore: Firestore, private route: ActivatedRoute) {
    this.colRef = collection(firestore, 'areas')
    this.areas = new BehaviorSubject<Area[] | null>(null)
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
        let arrAreas = e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Area
      })
      this.areas.next(arrAreas)
      return arrAreas
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
    this.areas.subscribe(v => {
      if (!v?.length) {
        return
      }
      
      this.currentArea = v!.find((v)=> v.id == areaId)
      return 
    })
    
    this.selectedArea = areaId

  }

}
