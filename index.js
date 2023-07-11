const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
})


/*app.use(morgan(`:method :url :status :res[content-length] - :response-time ms {"name": ":nameBody" "number": ":number"}`))*/
app.use(morgan(function (tokens, req, res) {
  if (tokens.method(req, res) !== "POST") {
    return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
} else {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res)
  ].join(' ')
}
}))


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

const today = Date()

app.get('/info', (request, response) => {
    response.send(`<h2>Phonebook has info for ${persons.length} people <br> ${today} </h2>`)
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    return Math.round(Math.random() * (10000 - 1) + 1);
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

        const regex = new RegExp(body.name, "i")
        const names = persons.map(item => item.name)
        const namesMatch = names.filter(item => item.match(regex))


    if (namesMatch.length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})