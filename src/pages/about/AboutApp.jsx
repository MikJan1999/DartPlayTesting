import React from 'react'

export default function AboutApp() {
    const imageWidth = 450;
    const imageHeight = 460;
    const image = {
        background: '#fff',
        padding: 9,
        boxSizing: 'border-box',
    }

    const align = {
        alignItems: 'start'
    }

    const p1 = {
        paddingLeft: 20,
        boxSizing: 'border-box'
    }
    const p2 = {
        paddingRight: 20,
        boxSizing: 'border-box'
    }

    return (
        <section className='about-page-container' style={{margin: '0 50px', padding: '0 10px 50px 20px' }}>
            <h3>O Aplikacji</h3>
            <div className='flex between' style={align}>
                <div className='about-image-container animate__animated animate__fadeInLeft'>
                        <img style={{...image, transform: 'rotate(-3deg)'}} width={ imageWidth } height={ imageHeight } 
                        src="https://cdn0.salir.com/es/articles/2/6/3/donde_jugar_a_los_dardos_en_barcelona_1362_600.jpg" alt="" 
                        />      
                </div>
                <div>
                    <p style={p1}>Dlaczego powstała ta aplikacja?
                    Darts to jedna z najbardziej angażujących gier integracyjnych — łączy rywalizację, strategię i dobrą zabawę. Nasza aplikacja powstała z myślą o firmowych eventach i spotkaniach integracyjnych, gdzie liczy się nie tylko wynik, ale przede wszystkim atmosfera i wspólna zabawa.
                    Aplikacja została stworzona przez pracowników firmy — ludzi, którzy sami grają w darts i wiedzą czego potrzebują gracze. Powstała oddolnie, z pasji do gry i chęci usprawnienia firmowych rozgrywek.
                    Koniec z ręcznym liczeniem punktów na kartkach i nieporozumieniami przy tablicy. Aplikacja automatycznie zlicza wyniki, pilnuje kolejności rzutów i ogłasza zwycięzcę — dzięki czemu Ty możesz skupić się na tym co najważniejsze: dobrej grze z zespołem.
                    Obsługuje najpopularniejsze tryby gry — 301, 501, 701, 1001 oraz Cricket — dla 2 do 6 graczy. Idealna na każde firmowe wyjście, turniej między działami czy piątkowy afterwork.).</p>
                </div>
            </div>
            
            <div className='flex between down' style={align}>
                <div>
                    
                <p style={p2}>Dlaczego powstała ta aplikacja?
                    Darts to jedna z najbardziej angażujących gier integracyjnych — łączy rywalizację, strategię i dobrą zabawę. Nasza aplikacja powstała z myślą o firmowych eventach i spotkaniach integracyjnych, gdzie liczy się nie tylko wynik, ale przede wszystkim atmosfera i wspólna zabawa.
                    Aplikacja została stworzona przez pracowników firmy — ludzi, którzy sami grają w darts i wiedzą czego potrzebują gracze. Powstała oddolnie, z pasji do gry i chęci usprawnienia firmowych rozgrywek.
                    Koniec z ręcznym liczeniem punktów na kartkach i nieporozumieniami przy tablicy. Aplikacja automatycznie zlicza wyniki, pilnuje kolejności rzutów i ogłasza zwycięzcę — dzięki czemu Ty możesz skupić się na tym co najważniejsze: dobrej grze z zespołem.
                    Obsługuje najpopularniejsze tryby gry — 301, 501, 701, 1001 oraz Cricket — dla 2 do 6 graczy. Idealna na każde firmowe wyjście, turniej między działami czy piątkowy afterwork..</p>

                </div>
                <div className='about-image-container animate__animated animate__fadeInRight'>
                        <img style={{...image, transform: 'rotate(3deg)'}} width={ imageWidth } height={ imageHeight } 
                        src="https://s3-eu-west-1.amazonaws.com/rentabilibar/media/actualidad/337/thumb.jpg" alt="" 
                        />      
                </div>
            </div>
    </section>
    )
}
