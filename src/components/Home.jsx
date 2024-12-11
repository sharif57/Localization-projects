import { useTranslation } from 'react-i18next';
import './i18n';
import Banner from './Banner';
import Card from './card';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className='space-y-10'>
            <Banner></Banner>
            <Card></Card>
            <div className="max-w-5xl mx-auto mt-20">
                <div className="App text-center">
                    <h1 className="text-sm mb-4">{t('welcome')}</h1>
                </div>
            </div>
        </div>
    );
}
