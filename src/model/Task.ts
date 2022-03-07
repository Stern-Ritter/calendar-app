class Task {
  private id: string;
  public name: string;
  public createdDate: number;
  public eventDate: number;
  public category: string;
  public tags: string[];
  public state: string;
  public description: string;

  getId(): string {
    return this.id;
  }

  setId(id: string): boolean {
    if (this.id === "") {
      this.id = id;
      return true;
    }
    return false;
  }

  constructor(options: TaskOptions) {
    const {
      id,
      name,
      createdDate,
      eventDate,
      category,
      tags,
      state,
      description,
    } = options;
    this.id = typeof id !== "undefined" ? id : "";
    this.name = name;
    this.createdDate = createdDate;
    this.eventDate = eventDate;
    this.category = category;
    this.tags = tags;
    this.state = state;
    this.description = description;
  }
}

export default Task;
