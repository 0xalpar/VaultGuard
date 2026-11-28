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

- Gerçek Phantom ve Solflare oturumları, daha yüksek hacimli yük testi ve bağımsız sözleşme denetimi açık.
- Bildirimler uygulama içindedir. Ayrı e-posta veya push servisi eklenmedi.
- Kasa sahibi yetkiyi iptal ettiğinde eski AgentID saklanır ve aynı kayıt yeniden açılamaz. Yeniden kayıt ve anahtar rotasyonu bu değişiklikte ertelendi.

## Devnet ön kontrolü

Agent ekranları ve ödeme API’si için ortam değerleri:

```dotenv
NEXT_PUBLIC_VAULTGUARD_MODE=chain
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_AGENTVAULT_PROGRAM_ID=<Devnet'te dağıtılmış programın public key'i>
VAULTGUARD_AGENT_API=devnet
```

Devnet modu sabit resmî RPC adresini ve beklenen genesis hash’i kullanır. Programın çalıştırılabilir olduğunu ve test USDC mint hesabını doğrular. Localnet test cüzdanları ile Devnet dağıtım yetkisini ayır. Program ilk dağıtımda ekibin kontrol ettiği anahtarla kurulmalı. Yayınlanacak frontend aynı program ID’sini kullanmalı. Program ID’si ve ağ tercihi frontend derleme ortamında verilmelidir.

Ön kontrolde Devnet RPC’ye ulaşıldı. Depoda tanımlı varsayılan program adresi Devnet’te bulunmadı. Repo bağlantısı bir Solana dağıtım cüzdanı veya hosting oturumu sağlamıyor. Gerçek Phantom ve Solflare doğrulaması, ekip cüzdanları ile Devnet dağıtımından sonra yapılmalıdır. Programı Mainnet’e taşımadan önce bağımsız denetim, ekip yetkileri ve üretim mint yapılandırması onaylanmalıdır.

## Bağımlılık ve yük testi sonucu

- Frontend ve sözleşme test araçları dahil tam npm taramalarında 0 bulgu. Yerel testler sınırlı bir SPL Token fixture yardımcısı kullanır.
- RustSec `cargo-audit 0.23.0` taramasında 0 güvenlik açığı. Üç uyarı açık: bakım dışı `bincode 1.3.3` ve `libsecp256k1 0.6.0`, ayrıca `rand 0.7.3` için soundness uyarısı. Bunlar Solana bağımlılıklarıyla birlikte yükseltilmeli.
- Yerel validator üzerinde `VAULTGUARD_LOAD_COUNT=12` ile yapılan ölçümde 12 eş zamanlı onayın 5'i ödendi, 7'si reddedildi. İlk ölçüm yaklaşık 429 ms sürdü. Ölçüm tek validator ve tek kasa içindir.
- Localnet ledger yeniden başlatma kontrolünde kesinleşmiş 24 ödeme kaydının adres, durum, ret nedeni ve tutar özeti önceki durumla birebir eşleşti.

## Aşama 20 doğrulaması

- Günlük limitin İstanbul saatiyle 00:00 sınırı, birikimli limitin korunması ve süresi dolan talebin işlenmemesi Rust birim testinde doğrulandı.
- Yerel sözleşme testleri başka kasa sahibinin politika değiştirememesini ve “Onaylandı” yazan alıcı etiketinin onay yerine geçmemesini doğruladı. Etiket veri olarak saklanır ve sözleşme kararına katılmaz. Prompt veya LLM içeren bir agent çalıştırıcısı bu repoda bulunmadığı için model düzeyinde prompt injection değerlendirmesi kapsam dışındadır.
- `VAULTGUARD_LOAD_COUNT=32` ile tek kasada 32 paralel onayın 5'i ödendi, 27'si reddedildi. Yerelde tek onay grubu yaklaşık 0,9 saniyede tamamlandı. Bu ölçüm üretim kapasitesini temsil etmez.
- RustSec uyarılarında `libsecp256k1` ve onun transitif bağımlılığı `rand` Solana hedefi dışında derlenir. `bincode` bakım uyarısı, Anchor ve Solana’nın ortak sürüm zinciriyle birlikte ele alınmalıdır.
- Yerel yeniden başlatma testi, ağdaki işlemleri kesinleştirdikten sonra `scripts/check-finalized-receipts.cjs --wait-finalized` çıktısını validator aynı kayıt diziniyle açıldıktan sonraki çıktıyla karşılaştırır.
- Kasa arayüzü entegre edilirken agent acil durdurma için `set_agent_emergency` çağrısını kullan. Bu işlem eski bekleyen taleplerin geçerliliğini sonlandırır ve her agent için yeniden etkinleştirme gerektirir.
- Bu sonuçlar geliştirme ekibinin doğrulamasıdır. Bağımsız sözleşme denetimi Mainnet öncesinde açık kalır.

## Kasa arayüzü

Zincir modunda **Param** ekranı bağlı cüzdanın kasalarını gösterir. Kasa oluşturma, yatırma ve kendi cüzdanına çekme işlemleri cüzdan imzası ister. Yatırma için cüzdanın test USDC hesabında bakiye gerekir. Çekim, sahibin token hesabı yoksa hesabı aynı işlemde oluşturur. Agent ödemelerinin acil durdurması Güvenliğim ekranındadır.

Son 15 zincir imzası arasından kasa oluşturma, yatırma ve çekme kayıtları gösterilir. Doğrulanmamış imza sekmede kasa sahibi ve ağ bazında saklanır. Yeni kasa işlemi başlatmadan önce sonuç veya blok geçerlilik süresi kontrol edilir.

Yerel validator doğrulamasında kasa oluşturuldu, 7,125001 test USDC yatırıldı ve agent ödemeleri durdurulmuşken 2,125001 test USDC aynı cüzdana çekildi. Kasa 5 test USDC gösterdi. Hareketlerde zincir imzaları doğru sırada okundu. Gerçek Phantom ve Solflare uzantısı testleri ekip kontratını Devnet’e dağıttıktan sonra yapılmalıdır.
