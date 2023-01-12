import { Sonuc } from './../../models/sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { kategori } from '../../models/kategori';
import { FbservisService } from './../../services/fbservis.servis';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  kategoriler!: kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secKat!: kategori;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adi: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kategori Ekle";
    this.modal.show();
  }
  Duzenle(kat: kategori, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: kategori, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriEkleDuzenle() {
    var kat: kategori = this.frm.value
    var tarih = new Date();
    if (!kat.katid) {
      var filtre = this.kategoriler.filter(s => s.katadi == kat.katadi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.kaytarih = tarih.getTime().toString();
        kat.duztarih = tarih.getTime().toString();
        this.fbservis.KategoriEkle(kat).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kategori Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.KategoriListele();
          this.modal.toggle();
        });
      }
    } else {
      kat.duztarih = tarih.getTime().toString();
      this.fbservis.KategoriDuzenle(kat).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.KategoriListele();
        this.modal.toggle();
      });
    }

  }
  KategoriSil() {
    this.fbservis.KategoriSil(this.secKat).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kategori Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.KategoriListele();
      this.modal.toggle();
    });
  }
}