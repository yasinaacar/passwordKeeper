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
  Sisteme yeni kaydolan kullanıcıya otomatik mail gönderilir. Aynı zamanda kullanıcı şifresini unuttuğunda yine bu paket sayesinde kullanıcıya şifre yenileme maili gönderilir.
#### sequelize:
- ORM (Object-Relational Mapping) kütüphanesi olarak kullanılır. Veritabanı işlemlerini kolaylaştırır ve ilişkisel veritabanlarıyla etkileşimi sağlar.
    `$ npm i sequelize@6.21.4`

## Uygulama Ekranları
![users](https://github.com/yasinaacar/passwordKeeper/assets/70544990/bcdefa09-c784-4812-8c09-bf0033ca8925)
![roles](https://github.com/yasinaacar/passwordKeeper/assets/70544990/0a4f5a7e-2cbe-4c03-a621-fef06a29e009)
![platforms](https://github.com/yasinaacar/passwordKeeper/assets/70544990/cc460c9b-b66f-4885-98ee-e448224bcc35)
![platform-edit](https://github.com/yasinaacar/passwordKeeper/assets/70544990/9bdc4d93-c641-4020-9db0-e414895917a7)
![emails](https://github.com/yasinaacar/passwordKeeper/assets/70544990/b0915e46-d985-473b-a151-61dc507972a2)
![edit-email](https://github.com/yasinaacar/passwordKeeper/assets/70544990/36e1b338-8334-4f18-ac91-c37d4df80332)
![download-excel](https://github.com/yasinaacar/passwordKeeper/assets/70544990/c35107fb-99ea-442e-97cd-7f65ecb6e3d4)
![delete-platforms](https://github.com/yasinaacar/passwordKeeper/assets/70544990/7ba3f27a-cc8e-4397-b7a2-6450ed9fd70a)
![categories](https://github.com/yasinaacar/passwordKeeper/assets/70544990/aa478139-b2cf-41d0-a07b-8d67272a2bb5)
![admin](https://github.com/yasinaacar/passwordKeeper/assets/70544990/98fd2881-1c9a-4007-9057-3e9e9d886437)





## Eklenecekler
#### - Config dosyaları

## Hata ve Öeneriler İçin:
[Bana Ulaş](mailto:yasinaacar@outlook.com)
