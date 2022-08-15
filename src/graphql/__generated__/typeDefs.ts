const typeDefs = `

schema {
  query: Query
}

"""Node interface"""
interface Node {
  """Global ID"""
  id: ID!
}

type Query {
  """서버 호출 테스트용"""
  ping: String!
}
`

export default typeDefs
