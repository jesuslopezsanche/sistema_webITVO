import { AreaService } from './area.service';
import { Injectable } from '@angular/core';
import {
  addDoc, collection, CollectionReference,
  deleteDoc, doc, DocumentData, Firestore,
  getDoc, getDocs, query, QueryDocumentSnapshot,
  updateDoc, where
} from '@angular/fire/firestore';
import { from, of, Observable } from 'rxjs';

export interface Program {
  id?: string,
  Area?: string,
  name: string,
  version: string,
  type: 'Pagado' | 'Gratuito',
  license: string,
  instalationDate: number,
  brand: string,
  status: 'Habilitado' | 'Inhabilitado'
}

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  colRef: CollectionReference
  programs: Observable<QueryDocumentSnapshot<DocumentData> | null>

  constructor(private firestore: Firestore, private areaService: AreaService) {
    this.colRef = collection(firestore, 'programs')
    this.programs = of(null)
  }

create(data: Program) {
    let program = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
    let area = this.areaService.getById(this.areaService.selectedArea)
    // if (program.size > area.capacity!) {
      // return
    // }
    let programData = { Area: this.areaService.selectedArea, ...data }
    return from(addDoc(this.colRef, programData).then(e => e))
  }
  update(id: string, program: Program) {
    // let updatedData =
    return from(updateDoc(doc(this.colRef, id), {
      program
    }))
  }

  getAll() {
    console.log("getting programs for", this.areaService.selectedArea);

    let programs = getDocs(query(this.colRef, where('Area', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Program
      }))

    return from(programs)
  }

  getById(id: string) {
    return getDoc(doc(this.colRef, id)).then(e => {
      return { id: e.id, ...e.data() } as unknown as Program
    }
    )
  }

  deleteById(id: string) {
    return from(deleteDoc(doc(this.colRef, id)))
  }
}
