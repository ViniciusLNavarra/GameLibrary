import faunadb from 'faunadb'

const client = new faunadb.Client({ 
    secret: process.env.REACT_APP_FAUNADB_KEY,
    domain: 'db.eu.fauna.com',
    scheme: 'https'
});
const {
    Paginate,
    Get,
    Select,
    Match,
    Index,
    Create,
    Collection,
    Collections,
    Lambda,
    Var,
    Join,
    Ref
} = faunadb.query;

{/* Queries
const findGameByID="hi";*/}
const getAllGames = client.query(
    Paginate(
        Match(
            Index('getAllGames')
        )
    )
).then((response) => {
    const gamesRefs = response.data;
    const getAllProductDataQuery = gamesRefs.map((ref) => {
        return Get(ref);
    });
    return client.query(getAllProductDataQuery).then((data) => data);
}).catch(error => console.warn('error', error.message));
{/*const getGameByTitle;

{/* Mutations 
const createGame;
const updateGame;
const deleteGame;*/}

export default getAllGames