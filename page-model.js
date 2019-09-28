import { Selector } from 'testcafe';

const label = Selector('label');

class Feature {

    constructor (text) {
        this.label = label.withText(text);
        this.checkbox = this.label.find('input[type=checkbox]');
    }
}

class OS {

    constructor (text) {
        this.label = label.withText(text);
        this.radioButton = this.label.find('input[type=radio]');
    }
}

class Page  {

    constructor () {
        this.nameInput = Selector('#developer-name');
        this.featuresList = [
            new Feature('remote-testing'), 
            new Feature('reusing-js-code'), 
            new Feature('background-parallel-testing'),
            new Feature('continuous-integration-embedding'),
            new Feature('traffic-markup-analysis')
        ];
        this.osList = [
            new OS('windows'),
            new OS('macos'),
            new OS('linux')
        ];

        
    }
}

export default new Page;

