import { Selector } from 'testcafe';
import axios from 'axios';

fixture `First Time`
    .page `dev_link`
    
test.before( async t => {
    deleteRecord();
    })
    ('Register Shipper', async t => {
    
    const top = Selector('[src=\"/assets/kargo-logo/shipper.svg\"]');
    await t
        .expect(top.exists).ok()
        .click('#landing_page-login_button');
    
    const select = Selector('form>div>div:nth-child(5)>span>span')
    await t.click(select);

    const namaPerusahaan = Selector('#login_signup_form-name_field');
    const email = Selector('#login_signup_form-email_field');
    const nomorTelepon = Selector('#login_signup_form-phone_field');
    const password = Selector('#login_signup_form-password_field');
    const buatAkun = Selector('span').withText('Buat Akun');
    const otp = Selector('span').withText('kode verifikasi');
    await t
        .typeText(namaPerusahaan, 'Nama Perusahaan')
        .typeText(email, 'email')
        .typeText(nomorTelepon, 'phone_number')
        .typeText(password, 'password')
        .click(buatAkun)
        .expect(otp.exists).ok()
    
});

function deleteRecord() {
    axios.post('link', {
            "phone_numbers" : ["phone_number"],
             "role" : "shipper" 
        })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
}