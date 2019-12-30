import {client} from '../index'

class BackendUtil {
    constructor(api) {
        this.api = api
    }

    query(variables) {
        return client.query({
            query: this.api,
            variables: variables
        })
    }

    mutation(variables) {
        return client.mutate({
            mutation:this.api,
            variables: variables
        })
    }


}

export default BackendUtil