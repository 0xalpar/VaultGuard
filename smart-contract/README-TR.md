# AgentVault — Docker Desktop / Aşama 13A

Bu paket Windows + Docker Desktop içindir. Önceki cüzdan entegrasyonu frontend'de aynen kalır. Ubuntu/WSL dağıtımı kurmak gerekmez; Docker Desktop Linux konteynerleri için WSL2 veya desteklenen Windows sürümlerinde Hyper-V kullanabilir. Debian tabanlı konteyner içinde Node 22, Rust 1.89.0, Solana CLI 2.3.0 ve Anchor 0.32.1 kurulur. x86-64 hedeflenir. Bunlar uyumluluk için seçilmiş sürümlerdir, en yeni sürüm iddiası yoktur.

## Kurulum (Windows PowerShell)

ZIP içindeki smart-contract klasörünü AgentVault ana klasörüne kopyala (frontend ile kardeş). Önceden smart-contract üzerinde çalıştıysan yedekle; bu paket önceki taslağın tam kaynaklarını içerir. Docker Desktop'ı aç, Linux containers modunda çalıştığını kontrol et.

```powershell
cd "C:\Users\MONSTER\Desktop\AgentVault\smart-contract"
docker version
docker compose version
docker info --format '{{.OSType}}'
docker compose config --quiet
docker compose up -d --build
docker compose exec chain anchor --version
docker compose exec chain solana --version
docker compose exec chain rustc --version
docker compose exec chain node --version
```

İlk imaj oluşturma internet bağlantısı ve disk alanı gerektirir. Dockerfile Anchor CLI'yi kaynak kodundan kurar. Konteyner Linux araçlarını çalıştırır; komutları PowerShell'den veririz.

## Derleme ve yerel test

```powershell
docker compose exec chain bash docker/build.sh
docker compose exec chain bash docker/local-test.sh
```

Build script test cüzdanı ve program keypair'ini yalnızca yoksa üretir, program ID'sini kaynak ve Anchor.toml içinde senkronize eder. .so ve IDL Docker target volume içinde tutulur. local-test script yerel validator başlatır, özel test ledger'ını sıfırlar, sentetik USDC mint ve programı genesis'e yükler, test SOL airdrop yapar, yedi alt testi çalıştırır ve validator'ı sonlandırır. RPC portları yalnızca Windows localhost'a yayınlanır. Her test yeni ledger kullanır, gerçek fon veya uzak RPC kullanılmaz.

```powershell
docker compose exec chain ls -l target/deploy/agentvault.so target/idl/agentvault.json
docker compose exec chain anchor keys list
docker compose exec chain tail -60 /ledger/validator.log
```

Program ID'si ve IDL'yi ileride frontend'e alacağız; program keypair veya test cüzdanı paylaşılmaz. Docker named volume'ları silme. `docker compose down` konteyneri durdurur, volume'ları korur; `down -v` kullanma. `target` volume içinde program anahtarı da bulunur. Mainnet anahtarlarını asla bu konteynere koyma. Scriptlerin CRLF olması sorun çıkarırsa VS Code ile LF olarak kaydet.

## Kapsam

`initialize_vault`: kullanıcı imzasıyla vault PDA ve mint'e bağlı ATA. Bir kullanıcı birden çok kasa ID'si kullanabilir. `deposit`: sahibin USDC ATA'sından kasa ATA'sına giriş. `withdraw`: sadece sahibi, PDA imzalı CPI ile kendi ATA'sına çekebilir. `set_frozen`: sadece sahibi, agent ödeme durdurma bayrağını değiştirir. Sahibin yatırma ve kendi ATA hesabına çekme işlemleri açık kalır. Mevcut programda agent ödeme instruction’ı henüz yoktur; eklendiğinde bu bayrağı kontrol etmesi zorunludur. Program seviyesi freeze, SPL token freeze authority değildir. USDC hesabı gerçek bakiyenin kaynağıdır. VaultCreated, VaultMovement, VaultFreezeChanged olayları yayılır. Owner public key ile kasalar bulunabilir. Program Devnet USDC mint adresini sabitler; yerel validator'da aynı adreste oluşturulan test tokenı gerçek USDC değildir. Gerçek Devnet dağıtımı, frontend'e bağlantı, agent yetkileri ve imzalı talep doğrulaması bu aşamada yoktur. Frontend'deki gerçek kasa oluşturma butonu kapalı kalır. Üretim amaçlı kullanma.

## Doğrulama durumu

Docker çalıştırma ortamı olmadığı için imaj build'i, Rust/SBF derlemesi ve validator testleri burada çalıştırılmadı. Bu paket test edilmesi gereken geliştirme taslağıdır. İlk yerel hata çıktısını paylaşırken private key, seed phrase veya keypair içeriği paylaşma. Sürümler ve bağımlılıklar derleme sırasında ayrıca doğrulanmalıdır.
