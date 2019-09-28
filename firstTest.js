import { Selector } from 'testcafe';

fixture `First Time`
    .page `http://devexpress.github.io/testcafe/example`;

test('Open the website', async t => {
    //
});

test('Generate name', async t => {

    let nameDOM = ['#developer-name', '#populate'];
    await t
        .setNativeDialogHandler(() => true)
        .click(Selector('#populate'));
        
    let currentName = await Selector(nameDOM[0]);
    //console.log(currentName.value);
    await t.expect(currentName.value).eql('Peter Parker');

});

test('Important features', async t => {

    let importantFeatures = 
        ['remote-testing', 'reusing-js-code', 'background-parallel-testing',
        'continuous-integration-embedding', 'traffic-markup-analysis'];

    for (let i = 0; i < importantFeatures.length; i++){
        await t
            .click('#' + importantFeatures[i])
            .expect(Selector('#' + importantFeatures[i]).checked).ok()
            .click('#' + importantFeatures[i])
            .expect(Selector('#' + importantFeatures[i]).checked).notOk();
    }
});

test('Operating Systems', async t => {

    let osType = ['windows', 'macos', 'linux'];
    for (let i = 0; i < osType.length; i++) {
        await t
            .click('#' + osType[i])
            .expect(Selector('#' + osType[i]).checked).ok();
        for (let j = 0; j < osType.length; j++) {
            if (j != i) {
                await t.expect(Selector('#' + osType[j]).checked).notOk();
            }
        }
        
    }
})

test('Preferred Interface', async t => {

    let interfacesList=['Both', 'JavaScript\ API', 'Command\ Line'];
    let prefferedInterface = Selector('#preferred-interface');
    let interfaceOption = prefferedInterface.find('option');
    for (let i = 0; i < interfacesList.length; i++) {
        await t
            .click(prefferedInterface)
            .click(interfaceOption.withText(interfacesList[i]))
            .expect(prefferedInterface.value).eql(interfacesList[i]);
    }
});

test('Tried test cafe', async t => {
    
    let currentSliderPosition = Selector('.ui-slider-handle').offsetLeft;
    const initialSliderPosition = await currentSliderPosition;
    await t
        .click('#tried-test-cafe')
        .dragToElement('.ui-slider-handle', await Selector('.slider-value').withText('9'))
        .expect(currentSliderPosition).gt(initialSliderPosition);

    await t
        .typeText('#comments', 'asd')
        .expect(Selector('#comments').value).eql('asd');
});

test('Change name and submit.', async t => {

    const name = 'John Smith';
    await t
        .typeText('#developer-name', name)
        .click('#submit-button');

    const articleHeader = await Selector('.result-content').find('h1');

    let headerText = await articleHeader.innerText;
    await t.expect(headerText).eql("Thank you, " + name + "!");
    
});

test('Try input number. case=not allowed to type', async t => {

    await t
        .typeText('#developer-name', 'Test')
        .pressKey('1 2 3 4 5 6 7 8 9 0')
        .expect(Selector('#developer-name').value).eql('Test');
});

test('Try input number. case=allowed to type, not allowed to submit', async t => {

    await t
        .typeText('#developer-name', 'Test')
        .pressKey('1 2 3 4 5 6 7 8 9 0')
        .expect(Selector('#developer-name').value).eql('Test1234567890')
        .click('#submit-button');

        const articleHeader = await Selector('.result-content').find('h1');
        let headerText = await articleHeader.innerText;
        await t.expect(headerText).eql("Thank you, " + 'Test' + '!');
});