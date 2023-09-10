const app = require('../src/server');
const session = require('supertest');
const agent = session(app);


describe('GET Country ID testing', ()=>{
    it('Must return status: 200', async()=>{
        // jest.setTimeout(10000); // Set timeout to 10 seconds
        await agent.get('/country/USA').expect(200);
    }, 100000)
    it('If country not found returns: 404', async()=>{
        await agent.get('/country/AAA').expect(404);
    })
}) 

describe('GET Country Name testing', ()=>{
    it('Must return status: 200', async()=>{
        await agent.get('/country?name=Kenya').expect(200);
    })
    it('If country not found return:404', async()=>{
        await agent.get('/country?name=pinaple').expect(404);
    })
}) 

describe('POST /activity', ()=>{
    const activity1={
        name:'catering',
        difficulty:"3",
        duration: 2,
        season:'Fall',
        countries:['United States', 'Mexico', 'Japan']
    }

    it('Must create the activity succesfully',async()=>{
        const {body}=await agent.post('/activities').send(activity1).expect(201)
        activityId= body.id
    })
    it('If activity already exists must return: 406', async()=>{
        await agent.post('/activities').send(activity1).expect(406)
        await agent.delete(`/activities/${activityId}`)
    })
    
})

describe('DELETE /activities/:id', ()=>{
    const activity2={
        name:'jumping',
        difficulty:1,
        duration: 2,
        season:'Fall',
        countries:['United States', 'Japan']
    }
    beforeAll(async () => {
        const { body } = await agent.post('/activities').send(activity2);
        activityId = body.id;
    });

    it('Deletes the activity when the ID exists', async () => {
        await agent.delete(`/activities/${activityId}`);

        const {body}= await agent.get('/activities')
        expect(body).not.toContain(activity2)
    });
    
    it('Returns an error when the ID doesnt exists', async()=>{
        const {body}=await agent.delete('/activities/4c11d55d-0e75-4970-ac77-8c55a6457a09').expect(404)

    })
})