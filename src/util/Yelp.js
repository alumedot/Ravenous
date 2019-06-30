const apiKey = 'RzZOQvx9cvbFj37GZ9dJ4xYuXNZ12G6h7MBnwKma0zWTMsRg6B0Ss5AjDb1H0ze6t78iP5pp7y-4Yyhx9nH_w1yLCpPLEI-JrsxsrVGxNdNurL3i9LTR4DA0zWcYXXYx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if(jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                        }
                    });
                }
            })
    }
};

export default Yelp;