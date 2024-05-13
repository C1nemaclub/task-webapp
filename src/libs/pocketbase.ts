import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8080/');
pb.autoCancellation(false);
export default pb;
