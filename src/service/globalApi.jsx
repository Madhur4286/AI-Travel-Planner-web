export const GetPlaceDetails = (data) => {
    return axios.get(`/api/place-details`, {
        params: {
            query: data.query,
        },
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching place details:", error);
        throw error;
    });
};
