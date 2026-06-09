/* ── Shared constants & helpers ────────────────────────────────────── */

const METADATA_URL = 'https://metadata.cloud.getdbt.com/graphql'
const METADATA_BETA_URL = 'https://metadata.cloud.getdbt.com/beta/graphql'

const getMetadataUrl = (useBetaAPI) =>
  useBetaAPI ? METADATA_BETA_URL : METADATA_URL

const getTypeString = (typeStructure) => {
  if (!typeStructure) return ''
  if (typeStructure.kind === 'NON_NULL') {
    return `${getTypeString(typeStructure.ofType)}!`;
  } else if (typeStructure.kind === 'LIST') {
    return `[${getTypeString(typeStructure.ofType)}]`;
  } else if (['OBJECT', 'SCALAR', 'ENUM'].includes(typeStructure.kind)) {
    return `${typeStructure.name}${getTypeString(typeStructure.ofType)}`;
  } else {
    return '';
  }
};

const TYPE_REF_FRAGMENT = `
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }`;

const LoadingIndicator = () => <h1>Fetching data...</h1>

const useGraphQLData = (useBetaAPI, query) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(getMetadataUrl(useBetaAPI), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((result) => result.json())
      .then((data) => setData(data))
  }, [])
  return data
}

/* ── Components ───────────────────────────────────────────────────── */

export const ArgsTable = ({ data, name }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Field</td>
          <td>Type</td>
          <td>Required?</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {data.fields.find(d => d.name === name).args.map(function ({ name, description, type }) {
          return (
            <tr key={name}>
              <td><code>{name}</code></td>
              <td><code title={type.description}>{getTypeString(type)}</code></td>
              <td>{type.kind === 'NON_NULL' ? `Yes` : `No`}</td>
              <td>{description || `No description provided`}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};


export const QueryArgsTable = ({ queryName, useBetaAPI }) => {
  const query = `{
    __schema {
        queryType {
        fields(includeDeprecated: true) {
            name
            type {
            name
            description
            }
            description
            args {
            name
            description
            defaultValue
            type {
                name
                description
                kind
                ofType { kind name description }
            }
            }
        }
        }
    }
    }`
  const data = useGraphQLData(useBetaAPI, query)
  if (!data) {
    return <LoadingIndicator />
  }
  return (
    <ArgsTable name={queryName} data={data.data.__schema.queryType} />
  )
}

export const NodeArgsTable = ({ parent, name, useBetaAPI }) => {
  const query = `
    query {
      __type(name: "${parent}") {
        ...FullType
      }
    }

    fragment FullType on __Type {
      kind
      fields(includeDeprecated: true) {
        name
        description
        args {
          name
          description
          defaultValue
          type {
            ...TypeRef
          }
        }
      }
    }

    # get several levels
    ${TYPE_REF_FRAGMENT}
  `
  const data = useGraphQLData(useBetaAPI, query)
  if (!data) {
    return <LoadingIndicator />
  }
  return (
    <ArgsTable name={name} data={data.data.__type} />
  )
}

export const SchemaTable = ({ nodeName, useBetaAPI, exclude = [] }) => {
  const query = `
    query {
      __type(name: "${nodeName}") {
        ...FullType
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        type {
          ...TypeRef
        }
      }
    }

    # get several levels
    ${TYPE_REF_FRAGMENT}
  `
  const data = useGraphQLData(useBetaAPI, query)
  if (!data) {
    return <LoadingIndicator />
  }
  return (
    <table>
      <thead>
        <tr>
          <td>Field</td>
          <td>Type</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {data.data.__type.fields.map(function ({ name, description, type }) {
          if (exclude.includes(name)) return;
          return (
            <tr key={name}>
              <td><code>{name}</code></td>
              <td><code title={type.description}>{getTypeString(type)}</code></td>
              <td>{description}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
