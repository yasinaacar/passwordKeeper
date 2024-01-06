# Password Keeper

Bu proje kullanıcının çeşitli platfomlarda kayıtlı olan hesap bilgilerinin (e-posta, şifre- kurtarma e-postası vb.) kaydını tutarak istediği hesabının bilgilerine tek bir uygulama üstünden erişmesini sağlamayı amaçlıyor. 

## İşlemler

### E-Posta İşlemleri
- Tüm e-posta adreslerinizi uygulamaya kaydederek uygulama içinde yeni bir hesap ekleyeceğiniz zaman halihazırda kayıtlı olan e-posta adreslerinizden birini atayabilirsiniz. Bu sayede her platform için tekrar tekrar e-posta adresinizi eklemenize gerek kalmaz.
- Eklediğiniz e-posta adresini daha sonrasında düzenleyebilir ve silebilirsiniz.

### Platform İşlemleri
- Platformun Adı, Platformun Logosu, Platform Linki tutabilirsiniz.
- Platformu oluşturduktan sonra bu platforma kayıtlı hesap bilgilerinizi (kullanıcı adı, şifre, e-posta, kurtarma e-postası, telefon numarası, kurtarma kodu) kaydedebilirsiniz.
- Eğer e-posta ekle kısmında posta adresiniz gözükmüyorsa "Create E-mail" butonuna tıklayarak yeni bir e-posta adresini kaydedebilirsiniz.
- Eklediğiniz platformla ilgili bilgileri ve platforma kayıtlı hesap bilgilerinizi daha sonrasında düzenleyebilir, silebilirsiniz.
   

### Kategoriler
- Kategori ekleyerek platformlarınızı kategorilere ayırabilirsiniz.
- Kategorilediğiniz platformları filtreleyebilirsiniz.
- Oluşturduğunuz kategoriyi daha sonrasında ekleyebilir, silebilirrsiniz
 
### Şifre Üretme
- Uygulama ana sayfasındaki şifre üretme aracını kullanarak platformlarınız için yeni şifreler oluşturabilir, bu şifreleri tek tıkla kopyalayabilirsiniz.

### Excel İle Veri Çekme
- Excel ile uygulama içindeki kayıtlı kategorilerinizi, platformlarınızı ve e-posta adreslerinizi indirebilirsiniz.
- İndirdirmeye karar verdiğiniz bilgilerinizi ne için indirdiğinizi belirterek buna göre taslaklara erişebilirsiniz. Verilerimi Görmek İçin / Verilerimi Güncellemek İçin / Veri Eklemek İçin
  

### Excel İle Veri Yükleme
- "Upload" sayfasına giderek yüklenecek excel dosyasının verileri güncelleme için mi yoksa yeni veriler için mi ekleneceğini seçtikten sonra
- Eklenecek excel dosyasının hangi ögeyle alakalı olduğunu (platform, e-posta, kategori) belirterek dosyanızı yükleyebilirsiniz.
- Bu sayede tüm platformlardaki bilgilerinizi el ile tek tek eklemenize gerek kalmaz.
-  
### Kullanıcılar
- Sadece admin rolündeki kullanıcıların erişebileceği bu sayfada sisteme kayıtlı hherhangi bir kullanıcıya ait sadece kullanıcı adı ve e-posta adresini görüntüleyebilir ve kullanıcıya çeşitli roller atayarak kullanıcının uygulama içi erişim hakkını arttırabilir.

### Roller
- Sadece admin rolündeki kullanıcıların erişebileceği bu sayfada admin sisteme yeni roller ekleyebilir. Eklenen rolleri daha sonrasında düzenleyebilir ve silebilir.

## Paketler

#### bcrypt:
-Kullanıcı şifrelerini güvenli bir şekilde saklamak için kullanılır.
    `$ npm i bcrypt@5.1.0`
#### bootstrap:
-Arayüz tasarımı için CSS ve JS kütüphanesi.
    `$ npm i bootstrap@5.2.3`
#### cookie-parser:
-Çerez işlemleri için kullanılır.
    `$ npm i cookie-parser@1.4.6`
#### ejs:
-Şablon motoru olarak kullanılır.
    `$ npm i ejs@3.1.8`
#### express-session:
-Kullanıcı şifrelerini güvenli bir şekilde saklamak için kullanılır.
    `$ npm i express-session@1.17.3`
#### exceljs:
- Excel ile veri indirme ve yükleme işlemleri için kullanılır
    `$ npm i exceljs@4.3.0`
#### multer:
- Dosya yükleme işlemleri için kullanılır.
    `$ npm i multer@1.4.5-lts.1`
#### mysql2:
-MySQL veritabanı bağlantısı için kullanılır.
    `$ npm i mysql2@2.3.3`
#### nodemailer:
- E-posta göndermek için kullanılır.
    `$ npm i nodemailer@6.9.3`
#### sequelize:
- ORM (Object-Relational Mapping) kütüphanesi olarak kullanılır. Veritabanı işlemlerini kolaylaştırır ve ilişkisel veritabanlarıyla etkileşimi sağlar.
    `$ npm i sequelize@6.21.4`

## Uygulama Ekranları
![Screenshot_7](https://github.com/yasinaacar/cinemovie/assets/70544990/63dd9b95-346a-4ade-a70d-58f181095b1d)
![Screenshot_6](https://github.com/yasinaacar/cinemovie/assets/70544990/2efc842b-0486-49e3-ad43-7139339736e2)
![Screenshot_5](https://github.com/yasinaacar/cinemovie/assets/70544990/db74907a-482a-4862-a154-7ab285e2ea47)
![Screenshot_4](https://github.com/yasinaacar/cinemovie/assets/70544990/ea53f5f5-b6b7-40ea-a9fc-61083065d4ae)
![Screenshot_3](https://github.com/yasinaacar/cinemovie/assets/70544990/92e48456-c6f5-43a8-8ea1-dc56b12e7ee4)
![Screenshot_2](https://github.com/yasinaacar/cinemovie/assets/70544990/6ac7a9f4-63dd-43e1-995c-24f247de3cc7)
![Screenshot_1](https://github.com/yasinaacar/cinemovie/assets/70544990/86ec88a7-4f4b-4363-af9f-74ef02b71720)
![1](https://github.com/yasinaacar/cinemovie/assets/70544990/e9bd8178-e2d0-49e7-8b39-614813f14395)



## Eklenecekler
#### - Config dosyaları

## Hata ve Öeneriler İçin:
[Bana Ulaş](mailto:yasinaacar@outlook.com)
