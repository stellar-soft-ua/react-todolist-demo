type Employee = {
    id: string;
    name: string;
    birthdate: string | null;
    jobTitle: string;
    salary: number;
}

type NewEmployee = Pick<Employee, "name" | "birthdate" | "salary" | "jobTitle">;

export type { Employee, NewEmployee };
