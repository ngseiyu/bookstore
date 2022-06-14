import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

const Container = styled.div``

const Title = styled.h1`
    margin: 20px; 
`

const FilterContainer = styled.div`
    display: flex; 
    justify-content: space-between;
`

const Filter = styled.div`
    margin: 20px;
`

const FilterText = styled.span`
    font-size: 20px; 
    font-weight: 600;
    margin-right: 20px; 
`

const Select = styled.select`
    padding: 10px; 
    margin-right: 20px;
`

const Option = styled.option`

`

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const category = cat.split("%20").join(" ");
    /* let title = category.split("%20");
    for (let i = 0; i < title.length; i++)
        title[i] = title[i].charAt(0).toUpperCase() + title[i].slice(1);
    title = title.join(" "); */
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (event) => {
        const value = event.target.value;
        setFilters({
            ...filters,
            [event.target.name]: value.toLowerCase()
            // (event.target.value).toLowerCase()
    });
        console.log("event target value in product list " + event.target.value)
    };

    return (
        <Container>
            <Navbar />
            <Title>{category}</Title>
            <FilterContainer>
                {/* <Filter>
                    <FilterText>Filter Products: </FilterText>
                    <Select name="category" onChange={handleFilters}>
                        <Option disabled>Category</Option>
                        <Option>Computer Science</Option>
                        <Option>Literature</Option>
                        <Option>Classics</Option>
                    </Select>
                </Filter> */}
                <Filter>
                    <FilterText>Sort Products: </FilterText>
                    <Select onChange={(event) => setSort(event.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="priceasc">Price (asc)</Option>
                        <Option value="pricedesc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;