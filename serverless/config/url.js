const URLs = {
    baseUrl: 'https://o0pjjcwlk5.execute-api.us-east-1.amazonaws.com/dev',
    getCategory: {
        url: `${URLs.baseUrl}/getCategory`,
        method: 'GET'
    },
    createCategory: {
        url: `${URLs.baseUrl}/getCategory`,
        method: 'POST',
        body: { category_id: '', title: '' }
    },
}