# VaultGuard agent ödemeleri

Bu geliştirme akışı mevcut Solana Localnet kasalarını kullanır. Testnet mint adresini paylaşan yerel test tokeni ile çalışır. Frontend zincir görünümünü açmak için `NEXT_PUBLIC_VAULTGUARD_MODE=chain`, ödeme API’sini açmak için `VAULTGUARD_AGENT_API=localnet` kullanılır. Frontend’in mevcut RPC, program ID ve mint ayarları çalışan yerel ortama ve IDL’ye uymalıdır.

1. Cüzdanı bağla. Asistanlarım ekranında kasayı seç, agent public key’ini gir ve ilk harcama politikasını cüzdanla imzala.
2. AgentID olarak kasa ve agent public key’inden türeyen zincir hesabı adresi gösterilir. Agentın işlem hesabı masrafları için yerel test SOL gerekir.
3. Agent, nonce ve son geçerliliği olan Solana ödeme işlemini kendi anahtarıyla imzalar. Yerel örnek komut `node scripts/submit-agent-payment.cjs <agent-keypair-file> <vault> <recipient> <micro-USDC> <nonce> <recipient-label>`. Örneğin `1000000` bir test USDC’dir. Nonce bu kayıtta artan pozitif tam sayıdır.
4. API, `POST /api/agent/payments` üzerinde yalnızca agentın imzaladığı tek bir `submitPayment` işlemini kabul eder. JSON alanı `transaction`, base64 imzalı Solana işlemidir. Normal yanıtta zincir talep adresi ve durum gelir. HTTP 202, sonuç zincirden henüz okunamadığı anlamına gelir. Durumu `GET /api/agent/payments?requestId=<adres>` ile sorgula. Yeniden iletirken aynı imzalı işlem verisini kullan. Aynı nonce için farklı bir alıcı veya tutar imzalama.
5. Onaylarım ekranında izin listesi dışındaki talebin alıcısını ve tutarını kontrol et, ardından cüzdanla onayla veya reddet. Güvenliğim ekranı acil durdurmayı ve politika değişikliklerini yönetir. İşlemlerim ekranı zincir talep durumunu, ret nedenlerini ve işlem imzalarını gösterir.

Politika ihlalleri beşinci doğrulanmış ret ile agentı askıya alır. Geçersiz imzalar ve yetki kontrollerini geçemeyen kayıt talepleri agentın ihlal sayacına yazılmaz. Yasak listesi önce gelir. Onay sırasında limitler ve yetki yeniden denetlenir. Takvim günü güncel Türkiye saatine göre UTC+03 olarak hesaplanır. Dondurma döneminden çıkıldığında aktif agentların yeniden etkinleştirilmesi gerekir.

Alıcı cüzdan adresine ek olarak agent 1–64 baytlık bir etiketi aynı işlemde imzalar. Etiket zincirde görünür ve agentın beyanıdır. Kimlik kararı ve alıcı politikaları cüzdan adresi üzerinden uygulanır. Sahiplik kanıtı, zincirde kullanılan kısa ömürlü blok özeti ve tek kullanımlık nonce ile her ödeme için yeniden alınır. Zincirdeki talep hesapları denetim kayıtlarının kaynağıdır. İşlem durumu onaylanmadan hata veya zaman aşımından sonra yeni nonce ile tekrar göndermek çift ödemeye yol açabilir.

## Dağıtım doğrulaması

Devnet’e geçmeden önce dağıtım yetkisini, hedef program ID’sini ve test cüzdanı bakiyelerini belirle. Yerel testte üretilen cüzdanlar dağıtım yetkisi olarak kullanılmaz. Phantom ve Solflare üzerinden en az iki kullanıcı, iki kasa ve iki agentla kayıt, limit güncellemesi, alıcı onayı, askıya alma, iptal ve işlem geçmişini doğrula. Frontend yapılandırması ve API ağ kısıtı bu durumda birlikte güncellenmelidir. Bağımsız denetim ve yetki yönetimi tamamlanınca Mainnet kararı verilir.

## Açık doğrulamalar

- Frontend ve sözleşme npm kilit dosyalarında tarama 5 yüksek ve 7 orta düzey bulgu bildirdi. Rapor bazı bulgular için uyumlu yükseltme sunmuyor. Bağımlılık geçişi ayrı doğrulanmalı.
- Rust bağımlılık denetimi, gerçek Phantom ve Solflare oturumları, yük ve eş zamanlı gönderim ölçümü ile bağımsız sözleşme denetimi açık.
- Bildirimler uygulama içindedir. Ayrı e-posta veya push servisi eklenmedi.
- Kasa sahibi yetkiyi iptal ettiğinde eski AgentID saklanır ve aynı kayıt yeniden açılamaz. Yeniden kayıt ve anahtar rotasyonu bu değişiklikte ertelendi.
