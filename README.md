# Veteriner Yönetim Sistemi - Full Stack Proje

Veteriner Yönetim Sistemi Full Stack Projesi, hayvan sahipleri, hayvanlar, doktorlar, randevular, aşılar ve raporlar gibi veterinerlikle ilgili temel kayıtları yönetmek için geliştirilmiş bir web uygulamasıdır. Bu proje, hem backend hem de frontend kısmını içermektedir.
Websitesine burdan ulaşabilirsiniz : [vetapp-busrakocak.netlify.app](https://vetapp-busrakocak.netlify.app/)
#### Genel Bilgiler

Projenin **Backend** kısmı,
Spring Boot ile geliştirilmiş bir REST API projesidir. API, hayvan sahipleri, doktorlar, randevular, aşılar ve raporlar gibi temel veri kayıtlarını yönetmek için kullanılabilir. Ayrıca, PostgreSQL veritabanı kullanılarak verilerin depolanması sağlanmıştır. Backend projesi, aşağıdaki teknolojileri kullanmaktadır:

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Lombok
- Mapstruct
- Swagger

**Frontend** kısmı,
React.js kullanılarak geliştirilmiştir. Kullanıcı arayüzü, veteriner yönetim sisteminin temel işlevlerini sunar. Sayfalar arası gezinme için React Router kullanılmıştır. Frontend projesi, aşağıdaki teknolojileri içermektedir:

- Javascript
- React
- Vite
- React Router
- Material-UI
- Axios

**Proje Geliştirme Ortamları ;**

- Visual Studio Code

**Proje;**
Pages, Component, App.jsx gibi bilesenlerden olusur.
**Customer:** Müşteri(hayvan sahibi) bilgilerini görüntüleme, ekleme, güncelleme ve silme.
**Animal:** Hayvan bilgilerini görüntüleme, ekleme, güncelleme ve silme.
**Doctor:** Veteriner bilgilerini görüntüleme, ekleme, güncelleme ve silme.
**Available Date:** Veterinerler icin uygun günleri görüntüleme, kaydetme, güncelleme, silme
**Appointment:** Randevu görüntüleme, ekleme, güncelleme ve silme.
**Vaccine:** Aşı bilgilerini görüntüleme, ekleme, güncelleme ve silme.
**Report:** Rapor görüntüleme, ekleme, güncelleme ve silme.

---

#### Deploy

Proje beckend kısmı Render platformu üzerinde deploy edilmiştir.
Frontend kısmı Netlify platformu üzerinde deploy edilmiştir.
Canlı projeye asagidaki linklerden erişebilirsiniz.



#### Endpoints

Aşağıda, API'nin sunduğu temel endpoint'lerin bir listesi bulunmaktadır:

| Endpoint                                     | HTTP Metodu | Açıklama                                                                |
| -------------------------------------------- | :---------- | ----------------------------------------------------------------------- |
| **vaccines**                                 |             |                                                                         |
| `/api/v1/vaccines/{id}`                      | GET         | Belirtilen ID'ye sahip asiyi getir                                      |
| `/api/v1/vaccines/{id}`                      | PUT         | Belirtilen ID'ye sahip asiyi guncelle                                   |
| `/api/v1/vaccines/{id}`                      | DELETE      | Belirtilen ID'ye sahip asiyi sil                                        |
| `/api/v1/vaccines`                           | GET         | Tum asilari getir                                                       |
| `/api/v1/vaccines`                           | POST        | Asi ekle                                                                |
| `/api/v1/vaccines/finishDate`                | GET         | Girilen tarih araligina gore asi kayitlari                              |
| `/api/v1/vaccines/findByAnimalId/{animalId}` | GET         | Belirli bir hayvana ait tüm aşı kayıtları                               |
|                                              |             |                                                                         |
| **doctors**                                  |             |                                                                         |
| `/api/v1/doctors/{id}`                       | GET         | Belirtilen ID'ye sahip doktoru getir                                    |
| `/api/v1/doctors/{id}`                       | PUT         | Belirtilen ID'ye sahip doktoru guncelle                                 |
| `/api/v1/doctors/{id}`                       | DELETE      | Belirtilen ID'ye sahip doktoru sil                                      |
| `/api/v1/doctors`                            | GET         | Tum doktorlari getir                                                    |
| `/api/v1/doctors`                            | POST        | Doktor ekle                                                             |
|                                              |             |                                                                         |
| **customers**                                |             |                                                                         |
| `/api/v1/customers/{id}`                     | GET         | Belirtilen ID'ye sahip hayvan sahibini getir                            |
| `/api/v1/customers/{id}`                     | PUT         | Belirtilen ID'ye sahip hayvan sahibini guncelle                         |
| `/api/v1/customers/{id}`                     | DELETE      | Belirtilen ID'ye sahip hayvan sahibini sil                              |
| `/api/v1/customers`                          | GET         | Tum hayvan sahiplerini getir                                            |
| `/api/v1/customers`                          | POST        | Hayvan sahibi ekle                                                      |
| `/api/v1/customers/byName`                   | GET         | Isme gore hayvan sahipleri                                              |
|                                              |             |                                                                         |
| **available_dates**                          |             |                                                                         |
| `/api/v1/available_dates/{id}`               | GET         | Belirtilen ID'ye sahip musait gunu getir                                |
| `/api/v1/available_dates/{id}`               | PUT         | Belirtilen ID'ye sahip musait gunu guncelle                             |
| `/api/v1/available_dates/{id}`               | DELETE      | Belirtilen ID'ye sahip musait gunu sil                                  |
| `/api/v1/available_dates`                    | GET         | Tum musait gunleri getir                                                |
| `/api/v1/available_dates`                    | POST        | Musait gun ekle                                                         |
|                                              |             |                                                                         |
| **appointments**                             |             |                                                                         |
| `/api/v1/appointments/{id}`                  | GET         | Belirtilen ID'ye sahip randevuyu getir                                  |
| `/api/v1/appointments/{id}`                  | PUT         | Belirtilen ID'ye sahip randevuyu guncelle                               |
| `/api/v1/appointments/{id}`                  | DELETE      | Belirtilen ID'ye sahip randevuyu sil                                    |
| `/api/v1/appointments`                       | GET         | Tum randevulari getir                                                   |
| `/api/v1/appointments`                       | POST        | Randevu ekle                                                            |
| `/api/v1/appointments/doctorId`              | GET         | Kullanıcı tarafından girilen tarih aralığına ve doktora göre randevular |
| `/api/v1/appointments/animalId`              | GET         | Kullanıcı tarafından girilen tarih aralığına ve hayvana göre randevular |
|                                              |             |                                                                         |
| **animals**                                  |             |                                                                         |
| `/api/v1/animals/{id}`                       | GET         | Belirtilen ID'ye sahip hayvani getir                                    |
| `/api/v1/animals/{id}`                       | PUT         | Belirtilen ID'ye sahip hayvani guncelle                                 |
| `/api/v1/animals/{id}`                       | DELETE      | Belirtilen ID'ye sahip hayvani sil                                      |
| `/api/v1/animals`                            | GET         | Tum hayvanlari getir                                                    |
| `/api/v1/animals`                            | POST        | Hayvan ekle                                                             |
| `/api/v1/animals/byName`                     | GET         | Isme gore hayvanlar                                                     |
| `/api/v1/animals/byCustomerName`             | GET         | Hayvan sahiplerine gore hayvanlar                                       |

**reports**
| `/api/v1/reports/{id}` | GET | Belirtilen ID'ye sahip raporu getir |
| `/api/v1/reports/{id}` | PUT | Belirtilen ID'ye sahip raporu guncelle |
| `/api/v1/reports/{id}` | DELETE | Belirtilen ID'ye sahip raporu sil |
| `/api/v1/reports` | GET | Tum raporları getir |
| `/api/v1/reports` | POST | Rapor ekle
|
