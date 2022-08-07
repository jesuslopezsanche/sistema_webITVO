import { AreaService } from './area.service';
import { Injectable } from '@angular/core';
import {
  addDoc, collection, CollectionReference,
  deleteDoc, doc, DocumentData, Firestore,
  getDoc, getDocs, limit, orderBy, query, QueryDocumentSnapshot,
  updateDoc, where
} from '@angular/fire/firestore';
import { from, of, Observable } from 'rxjs';

export interface Computer {
  id?: string,
  Area?: string,
  serialNumber: string,
  name: string,
  user: string,
  brand: string,
  status: 'Disponible' | 'Mantenimiento' | 'Rentado',
  description?: string, 
}

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  colRef: CollectionReference
  materials: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore, private areaService: AreaService) {
    this.colRef = collection(firestore, 'computers')
    this.materials = of(null)
  }

create(data: Computer) {
    let computers = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
    let area = this.areaService.getById(this.areaService.selectedArea)
    // if (material.size > area.capacity!) {
      // return
    // }
    
    let computerData = { Area: this.areaService.selectedArea, ...data }
    console.log('creating computer', computerData);
    return from(addDoc(this.colRef, computerData).then(e => e))
  }
  update(id: string, material: Computer) {
    // let updatedData =
    return from(updateDoc(doc(this.colRef, id), {
      ...material
    }))
  }

  getAll() {
    console.log("getting computers for", this.areaService.selectedArea);

    let materials = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Computer
      }))

    return from(materials)
  }
  getAvailable() {
    console.log("getting available computers for", this.areaService.selectedArea);

    let materials = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea), where('status', '==', 'Disponible'), orderBy('user'), limit(1)))
      .then(e => e.docs)
      .then(e => {
        if (!e.length)
        return null
        console.log({e});
        

        let el = e[0]
        
        return { id: el.id, ...el.data() } as unknown as Computer
      })

    return from(materials)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Computer
    }
    )
  }

  deleteById(id: string) {
    return from(deleteDoc(doc(this.colRef, id)))
  }
}
