import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Teach } from './teach.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class TeachService {

    constructor(@InjectModel('Teach') private readonly teachModel: Model<Teach>) { }

    async getAllTeachs() {
        const teachs = await this.teachModel.find().exec();
        return teachs.map(t => ({ id: t.id, 
            name: t.name,
            subject: t.subject,
            spec: t.spec,
            clas: t.clas, 
            picture: t.picture 
        }));
    }

    async insertTeach(name: string, subject:string, spec: string, clas: Array<string>, picture:string) {
        const newTeach = new this.teachModel({ name: name, subject:subject, spec:spec, clas:clas, picture:picture });
        const result = await newTeach.save();
       // console.log(result);
        return result.id as string;
    }

    async getTeachById(teachId: string) {
        const teach = await (await this.findTeach(teachId));
        return { name: teach.name, subject: teach.subject, spec: teach.spec, clas: teach.clas, picture: teach.picture };
    }

    async updateTeachById(teachId: string, name: string, subject:string, spec: string, clas: Array<string>, picture:string) {
        const updatedTeach = await this.findTeach(teachId);

        if (name) {
            updatedTeach.name = name;
        }
        if (subject) {
            updatedTeach.subject = subject;
        }
        if (spec) {
            updatedTeach.spec = spec;
        }
        if (clas) {
            clas.forEach(e => {
                if (e && updatedTeach.clas.indexOf(e) == -1) {
                    updatedTeach.clas.push(e);
                }
            });
        }
        if (picture) {
            updatedTeach.picture = picture;
        }
        updatedTeach.save();
        // this.products[index] = updatedProduct;
    }

    async deleteTeachById(teachId: string) {
        const result = await this.teachModel.deleteOne({ _id: teachId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

    }

    private async findTeach(teachId: string): Promise<Teach> {
        let teach;
        try {
            teach = await this.teachModel.findById(teachId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!teach) {
            throw new NotFoundException('product does not exist');
        }
        return teach;
    }
}