import MainLayout from '../components/MainLayout';
import CardsList from '@/components/CardsList/CardList';
import Content from '@/components/Content/Content';
// import '../styles/main.scss';

export default function Index() {
    return (
        <MainLayout title={'Home Page'}>
            <p>Авторизуйтесь</p>

            {/* <Content>
                <CardsList />
            </Content> */}
        </MainLayout>
    );
}
