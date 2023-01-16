import {api} from "@/request/http";

export let request = {
    login: function (user) {
        return api({
            method: 'post',
            url: '/api/login',
            data: user
        })
    },
    save: function (data) {
        return api({
            method: 'post',
            url: '/api/save',
            data: data
        })
    },
    record: function (user_id) {
        return api({
            method: 'post',
            url: '/api/record',
            data: user_id
        })
    },
    delRecord: function (record_id) {
        return api({
            method: 'post',
            url: '/api/delRecord',
            data: record_id
        })
    }
}