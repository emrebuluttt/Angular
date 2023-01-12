import { FbservisService } from 'src/app/services/fbservis.servis';
import { ActivatedRoute } from '@angular/router';
import { kategori } from '../../models/kategori';
import { Sonuc } from '../../models/sonuc';
import { MytoastService } from '../../services/mytoast.service';
import { Haber } from '../../models/haber';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-haber',
  templateUrl: './haber.component.html',
  styleUrls: ['./haber.component.scss']
})
export class HaberComponent implements OnInit {
  haberler!: Haber[];
  kategoriler!: kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secHaber!: Haber;
  katId!:string;
  secKat: kategori = new kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    haberadi: new FormControl(),
    resim: new FormControl(),
    baslik: new FormControl(),
    categoryId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  // HaberListele: any;
  constructor(
    public toast: MytoastService,
    public route: ActivatedRoute,
    public fbservis:FbservisService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriListele();

      }
    });
    this.KategoriListele();
  }
  KatSec(katId: string) {
    this.katId = katId;
    this.KategoriListele();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Haber Ekle";
    this.modal.show();
  }
  Duzenle(Haber: Haber, el: HTMLElement) {
    this.frm.patchValue(Haber);
    this.modalBaslik = "Haber Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(haber: Haber, el: HTMLElement) {
    this.secHaber =haber ;
    this.modalBaslik = "Haber Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  HaberListele() {
    this.fbservis.HaberListeleByKatId(this.katId).subscribe(d => {
      this.haberler = d;
    });
  }
  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  // KategoriGetir() {
  //   this.fbservis.KategoriById(this.katId).then(d => {
  //     this.secKat = d;
  //     this.HaberListele();
  //   });
  // }
  HaberEkleDuzenle() {
    var haber: Haber = this.frm.value
    var tarih = new Date();
    if (!haber.haberId) {

      var filtre = this.haberler.filter(s => s.haberadi == haber.haberadi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Haber Adı Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
    console.log("elsenin içine girdi  ")

        haber.kaytarih = tarih.getTime().toString();
        haber.duztarih = tarih.getTime().toString();
        this.fbservis.HaberEkle(haber).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Haber Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.HaberListele();
          this.modal.toggle();
        });
      }
    } else {
      haber.duztarih = tarih.getTime().toString();
      this.fbservis.HaberDuzenle(haber).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Haber Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.HaberListele();
        this.modal.toggle();
      });

    }

  }
  HaberSil() {
    this.fbservis.HaberSil(this.secHaber).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Haber Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.HaberListele();
      this.modal.toggle();
    });
  }
}