import createNightmare from '../nightmare';
import register from '../operations/register';
import login from '../operations/login';
import createFollower from '../operations/createFollower';
import {editFollower, deleteFollower} from '../operations/followerRowOptions';
import textFieldTestkit from '../testkits/textField';
import {assert} from 'chai';

describe('followers page', function() {
    this.timeout(10000);

    let nightmare;

    beforeEach(() => {
        nightmare = createNightmare();
    });

    it('create follower', async () => {
        const {nightmare, email, password} = await register();
        await createFollower({nightmare});
        await nightmare.end();
    });

    it('edit follower details', async () => {
        const {nightmare, email, password} = await register();
        const follower = await createFollower({nightmare});
        const nameSelector = ".edit-follower-modal input[name='name']";
        const emailSelector = ".edit-follower-modal input[name='email']";
        const inputTestkit = textFieldTestkit(nightmare);

        await editFollower(nightmare)(0);

        //update
        await nightmare
            .type(nameSelector, null)
            .type(nameSelector, 'Foo')
            .type(emailSelector, null)
            .type(emailSelector, 'foo@bar.baz')
            .mouseup('.create-follower-btn');


        //let the server process
        await nightmare.wait(500);

        //refresh and verify
        await nightmare
            .goto('/followers')
            .wait('.entity-table')
            .evaluate(() => document.querySelector('.entity-table').innerText)
            .then(tableTxt => {
                assert.include(tableTxt, 'Foo');
            });

        await nightmare.end();
    });

    it('delete follower details', async () => {
        const {nightmare, email, password} = await register();
        const follower = await createFollower({nightmare});

        await deleteFollower(nightmare)(0);

        //update
        await nightmare.mouseup('.confirmBtn');

        //let the server process
        await nightmare.wait(500);

        await nightmare
            .goto('/followers')
            .wait('.entity-table')
            .evaluate(() => document.querySelector('.entity-table').innerText)
            .then(tableTxt => {
                assert.notInclude(tableTxt, 'Foo');
            });

        await nightmare.end();
    });
});
