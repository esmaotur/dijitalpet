# Dijital Evcil Hayvan Uygulaması 🐾

Sanal bir evi hayvanı yönetmek için eksiksiz, üretime hazır bir React Native mobil uygulaması. Evcil hayvanınızı mutlu ve tok tutun, günlük giriş serilerinizi koruyun, onu besleyerek ve oyun oynayarak seviye atlayıp başarıların (rozetlerin) kilidini açın!

## Özellikler ✨
- **🐾 Dijital Evcil Hayvan Sistemi**: Evcil hayvanınızın dikkat etmeniz gereken açlık ve mutluluk ihtiyaçları vardır.
- **🎮 Oyunlaştırma (Gamification)**: Hayvanınızı besleyerek ve onunla oynayarak DP (XP) kazanın ve seviye atlayın.
- **🏆 Başarılar**: Belirli hedeflere ulaştığınızda özel rozetlerin kilidini açın (örneğin: 5. Seviye, 7 Günlük Seri).
- **📅 Günlük Görevler ve Seri**: Serinizi korumak için her gün uygulamaya girme ve hayvanınızı besleme gibi görevleri tamamlayın.
- **🎭 Ruh Hali Sistemi**: Hayvanınızın ruh halini (mutlu, üzgün, uykulu, enerjik) değiştirebilir ve yüz ifadesinin nasıl değiştiğini görebilirsiniz!
- **🪪 Profil Kartı**: Hayvanınızın seviyesini, deneyim puanını (XP) ve mevcut serisini anlık takip edin.
- **💾 Veri Kaydetme**: Hayvanınızın tüm ilerlemesi `AsyncStorage` kullanılarak yerel olarak kaydedilir; böylece uygulamayı kapatsanız bile verileriniz kaybolmaz.
- **✨ Arayüz (UI) ve Animasyonlar**: Hoş pastel renkler, yuvarlatılmış köşeler, temiz gölgeler, dokunsal geri bildirim ve pürüzsüz animasyonlar!

## Kurulum 🛠️
1. Bilgisayarınızda [Node.js](https://nodejs.org/) kurulu olduğundan emin olun.
2. Bu projeyi indirin.
3. Terminalinizi açın ve proje klasörüne (`digitalpet`) gidin.
4. Gerekli tüm paketleri kurmak için `npm install` komutunu çalıştırın.

## Çalıştırma Talimatları 🚀
Uygulamayı yerel olarak Expo ile çalıştırmak için:
```bash
npx expo start
```
Bu komut Expo Metro sunucusunu başlatacaktır. Çıkan karekodu (QR kod), telefonunuzdaki (iOS veya Android) **Expo Go** uygulaması ile okutarak cihazınızda canlı olarak görebilir veya bilgisayarınızdaki bir emülatörde (Android Studio / Xcode vb.) test edebilirsiniz.

## APK Bilgisi 📦
Android için bir APK dosyası oluşturmaya hazır olduğunuzda, EAS Build'i kullanabilirsiniz:
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
Bu işlem indirilip herhangi bir Android cihaza doğrudan kurulabilen bir `.apk` dosyası üretecektir.

## Demo Videosu 🎥
[YouTube Linki Buraya Gelecek] - Uygulamayı çalışırken buradan izleyin!
