import { MilvusClient } from '@zilliz/milvus2-sdk-node';

interface MilvusDocument {
  id: number;
  vector: number[];
  content?: string;
}

interface SearchResult {
  id: number;
  distance: number;
}

export class MilvusService {
  private client: MilvusClient;
  private collectionName: string = 'HackerNews'; 
  
  constructor() {
    this.client = new MilvusClient({
      address: process.env.MILVUS_ADDRESS!,
      token: process.env.MILVUS_TOKEN
    });
  }

  async insert(data: any) {
    return await this.client.insert({
      collection_name: this.collectionName,
      data
    });
  }

  async searchVector(vectors: number[][], fields: string[] = ["id"], limit: number = 5) {
    const searchResponse = await this.client.search({
      collection_name: this.collectionName,
      vectors: vectors,
      filter: "content != ''",
      output_fields: fields,
      limit: limit
    });
    
    return searchResponse.results;
  }

  async searchById(id: number) {
    const response = await this.client.query({
      collection_name: this.collectionName,
      filter: `id == ${id}`,
      output_fields: ["id", "vector"],
      limit: 1
    });

    return response.data;
  }

  async getSimilar(id: number, limit: number = 6) {
    const vectorData = await this.searchById(id);
    if (!vectorData || vectorData.length === 0) {
      throw new Error('Article not found');
    }

    const searchResponse = await this.client.search({
      collection_name: this.collectionName,
      vectors: [vectorData[0].vector],
      filter: "content != ''",
      output_fields: ["id"],
      limit: limit
    });

    return searchResponse.results;
  }
}

export const milvusService = new MilvusService(); 