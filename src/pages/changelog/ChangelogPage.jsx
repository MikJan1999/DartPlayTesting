import VersionWrapper, { Version, VersionText } from './components/Version';
import 'pages/changelog/changelog.css';

export default function ChangelogPage() {
    return (
        <>
            <div className="flex center column">
                <VersionWrapper>
                    <Version version="0.1.1" date="01.04.2026">
                        <VersionText text="Dodanie głównych funkcjonalności (301, 501, 701, 1001)"></VersionText>
                    </Version>
                </VersionWrapper>

    
            </div>
        </>
    );
}
