function magicTemplate(strings, ...parameters) {

    function findProperty(property) {
        return parameters.find(el => el.hasOwnProperty(property))[property]
    }

    return (inject) => {
        const firstName = inject.firstName ?? findProperty("firstName")
        const lastName = inject.lastName ?? findProperty("lastName")

        console.log(`${strings[0]}${firstName}${strings[1]}${firstName} ${lastName}${strings[2]}`)
    }
}

const firstName = 'James'
const lastName = 'Bond'


const update = magicTemplate`My name is ${{ lastName }}. ${{ firstName }} ${{ lastName }}.`

update({ firstName: 'George' })
update({ lastName: 'Weasley' })
update({ firstName: 'Ron' })

