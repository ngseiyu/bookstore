import {
    MailOutline,
    Phone,
    Room
} from '@mui/icons-material/';
import styled from 'styled-components';

const Container = styled.div`
    display: flex; 
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1``

const Description = styled.p`
    margin: 20px 0px;
`

/* const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
` */

const Center = styled.div`
    flex: 1;
    padding: 20px; 
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex; 
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%; 
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px; 
`

const ContactItem = styled.div`
    margin-bottom: 20px; 
    display: flex; 
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>SOOYAA.</Logo>
                <Description>
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don't look even slightly believable.
                </Description>
                {/* <SocialContainer>
                <SocialIcon>
                    
                </SocialIcon>
            </SocialContainer> */}
            </Left>
            <Center>
                <Title>Useful links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>My account</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: 10 }} />
                    510, Nanyuan Dorm, Wangjiang Campus
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: 10 }} />
                    +86 12345678910
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: 10 }} />
                    contact@qq.scu
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    );
};

export default Footer;